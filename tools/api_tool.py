import requests
import json

def api_tool(url: str, method: str = "GET", params: dict = None, data: dict = None) -> str:
    try:
        response = requests.request(method=method, url=url, params=params, json=data)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return f"An error occurred: {e}"