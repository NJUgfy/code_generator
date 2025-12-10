from agents.base_agent import BaseAgent
from typing import Dict, Any
import json
from llm.openai_llm import OpenAILLM
from tools.file_tools import read_file, write_to_file
from tools.brave_search import BraveSearch
import os

class CoderAgent(BaseAgent):
    def __init__(self, name: str = "Coder", role: str = "Code Generation Specialist"):
        super().__init__(name, role)
        self.llm = OpenAILLM()
        self.search_tool = BraveSearch()

    def _strip_markdown(self, code: str) -> str:
        lines = code.strip().split('\n')
        if lines and lines[0].strip().startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
            
        return "\n".join(lines).strip()

    def execute_task(self, task: Dict[str, Any]) -> str:
        print(f"[{self.name}] received task: {task.get('description')}")
        if task.get("type") == "coding_task":
            return self._handle_coding_task(task)
        elif task.get("type") == "evaluation_result" and task.get("status") == "requires_revision":
            return self._handle_revision_request(task)
        
        return "No action taken."

    def _handle_coding_task(self, task: Dict[str, Any]) -> str:
        file_path = task.get("file_path")
        description = task.get("description")
        api_data = task.get("api_data")
        if not file_path or not description:
            return "Error: 'file_path' and 'description' are required for coding tasks."

        print(f"[{self.name}] starting to code for: {description}")
        
        current_code = ""
        if os.path.exists(file_path):
            current_code = read_file(file_path)

        generated_code = self._generate_code(description, current_code, api_data)
        cleaned_code = self._strip_markdown(generated_code)
        
        write_to_file(file_path, cleaned_code)
        
        print(f"[{self.name}] finished coding. Notifying Planner.")
        self.send_message("Planner", {"type": "task_complete"})
        
        return f"Code generated for {file_path}."

    def _handle_revision_request(self, task: Dict[str, Any]) -> str:
        file_path = task.get("file_path")
        feedback = task.get("feedback")

        if not file_path or not feedback:
            return "Error: 'file_path' and 'feedback' are required for revision requests."

        print(f"[{self.name}] received revision request: {feedback}")

        current_code = read_file(file_path)
        
        revised_code = self._revise_code(feedback, current_code)
        cleaned_code = self._strip_markdown(revised_code)
        write_to_file(file_path, cleaned_code)

        print(f"[{self.name}] finished revision. Notifying Planner.")
        self.send_message("Planner", {"type": "task_complete"})

        return f"Code revised for {file_path}."

    def _generate_code(self, description: str, current_code: str = "", api_data: Any = None) -> str:
        search_results = self.search_tool.search(description)
        
        api_context = ""
        if api_data:
            if isinstance(api_data, list):
                data_str = json.dumps(api_data, indent=2)
            else:
                data_str = str(api_data)

            api_context = f"""
**API Data:**
Here is the data returned from a recent API call. Use this data in the code you generate. If it is a list, you may need to process or merge the items.
```json
{data_str}
```
"""

        system_prompt = f"""
You are an expert programmer. Your task is to write clean, efficient, and correct code based on a given description.
You will be given a description of the task, the current content of the file, and some search results for context.
{api_context}
Your output MUST be ONLY the complete, updated code for the file. Do NOT include any explanations, markdown, or any text other than the code itself.

**Search Results:**
{search_results}
"""
        user_message = f"**Task Description:**\n{description}\n\n**Current Code:**\n```\n{current_code}\n```\n\nPlease provide the complete, updated code for the file."
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
        
        return self.llm.generate_completion(messages, temperature=0.1)

    def _revise_code(self, feedback: str, current_code: str) -> str:
        search_results = self.search_tool.search(feedback)

        system_prompt = f"""
You are an expert programmer. Your task is to revise a piece of code based on specific feedback.
You will be given the feedback, the current code, and some search results for context.
Your output MUST be ONLY the complete, updated code for the file. Do NOT include any explanations, markdown, or any text other than the code itself.

**Search Results:**
{search_results}
"""
        user_message = f"**Revision Feedback:**\n{feedback}\n\n**Current Code:**\n```\n{current_code}\n```\n\nPlease provide the complete, revised code for the file."
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
        
        return self.llm.generate_completion(messages, temperature=0.1)
