from agents.base_agent import BaseAgent
from typing import Dict, Any
from tools.brave_search import BraveSearch
from tools.api_tool import api_tool

class SearchAgent(BaseAgent):
    def __init__(self, name: str = "Searcher", role: str = "Information Retrieval Specialist"):
        super().__init__(name, role)
        self.search_tool = BraveSearch()

    def execute_task(self, task: Dict[str, Any]) -> str:
        action = task.get("action")
        requester = task.get("requester")

        if not action or not requester:
            return "Error: 'action' and 'requester' are required for search tasks."

        if action == "search":
            query = task.get("query")
            if not query:
                return "Error: 'query' is required for 'search' action."
            
            print(f"[{self.name}] received search request from '{requester}': {query}")
            search_results = self.search_tool.search(query)
            print(f"[{self.name}] found results. Sending back to '{requester}'.")
            self.send_message(requester, {
                "type": "search_result",
                "results": search_results
            })
            return f"Search completed for: {query}"

        elif action == "api_call":
            requests_list = task.get("requests")
            if not requests_list or not isinstance(requests_list, list):
                return "Error: 'requests' must be a list of API calls."

            all_results = []
            for api_request in requests_list:
                url = api_request.get("url")
                if not url:
                    all_results.append("Error: 'url' is required for each API call in the 'requests' list.")
                    continue

                method = api_request.get("method", "GET")
                params = api_request.get("params")
                data = api_request.get("data")

                print(f"[{self.name}] received api request from '{requester}': {method} {url}")
                api_results = api_tool(url=url, method=method, params=params, data=data)
                all_results.append(api_results)

            print(f"[{self.name}] got all api responses. Sending back to '{requester}'.")
            self.send_message(requester, {
                "type": "api_result",
                "results": all_results
            })
            return f"API calls completed for task."
        
        else:
            return f"Error: Unknown action '{action}'"


    def receive_message(self, sender: str, message: Dict[str, Any]):
        message_type = message.get("type")
        if message_type == "search_request" or message_type == "api_request":
            self.execute_task(message)
        else:
            super().receive_message(sender, message)
