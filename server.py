import http.server
import socketserver
import json
import os
from urllib.parse import parse_qs

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MXHerbalRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path == '/api/enquiry':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Try parsing as JSON first
                data = json.loads(post_data.decode('utf-8'))
            except json.JSONDecodeError:
                # Fallback to form urlencoded
                parsed_data = parse_qs(post_data.decode('utf-8'))
                data = {k: v[0] for k, v in parsed_data.items()}
            
            # Print to server logs
            print("\n" + "="*40)
            print("NEW RITUAL ENQUIRY RECEIVED:")
            print("-"*40)
            print(f"Name:     {data.get('name', 'N/A')}")
            print(f"Phone:    {data.get('phone', 'N/A')}")
            print(f"Email:    {data.get('email', 'N/A')}")
            print(f"Product:  {data.get('interest', 'N/A')}")
            print(f"Message:  {data.get('message', 'N/A')}")
            print("="*40 + "\n")
            
            # Save to inquiries database file
            db_path = os.path.join(DIRECTORY, 'enquiries.json')
            enquiries = []
            if os.path.exists(db_path):
                try:
                    with open(db_path, 'r', encoding='utf-8') as f:
                        enquiries = json.load(f)
                except Exception:
                    pass
            
            enquiries.append(data)
            
            try:
                with open(db_path, 'w', encoding='utf-8') as f:
                    json.dump(enquiries, f, indent=4, ensure_ascii=False)
            except Exception as e:
                print(f"Failed to write to local enquiries.json database: {e}")
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "status": "success",
                "message": "Enquiry received successfully."
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
        elif self.path == '/api/order':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Try parsing as JSON first
                data = json.loads(post_data.decode('utf-8'))
            except json.JSONDecodeError:
                # Fallback to form urlencoded
                parsed_data = parse_qs(post_data.decode('utf-8'))
                data = {k: v[0] for k, v in parsed_data.items()}
            
            # Print to server logs
            print("\n" + "="*40)
            print("NEW CUSTOMER ORDER RECEIVED:")
            print("-"*40)
            print(f"Name:     {data.get('name', 'N/A')}")
            print(f"Email:     {data.get('email', 'N/A')}")
            print(f"Mobile:    {data.get('mobile', 'N/A')}")
            print(f"WhatsApp:  {data.get('whatsapp', 'N/A')}")
            print(f"Message:   {data.get('message', 'N/A')}")
            print("Products ordered:")
            products = data.get('products', {})
            for prod, var_map in products.items():
                if isinstance(var_map, dict):
                    for var_name, qty in var_map.items():
                        if qty > 0:
                            print(f"  - {prod} ({var_name}): {qty} unit(s)")
                else:
                    try:
                        if int(var_map) > 0:
                            print(f"  - {prod}: {var_map} unit(s)")
                    except Exception:
                        pass
            print(f"Total quantity: {data.get('total_quantity', 0)}")
            print("="*40 + "\n")
            
            # Save to orders database file
            db_path = os.path.join(DIRECTORY, 'orders.json')
            orders = []
            if os.path.exists(db_path):
                try:
                    with open(db_path, 'r', encoding='utf-8') as f:
                        orders = json.load(f)
                except Exception:
                    pass
            
            orders.append(data)
            
            try:
                with open(db_path, 'w', encoding='utf-8') as f:
                    json.dump(orders, f, indent=4, ensure_ascii=False)
            except Exception as e:
                print(f"Failed to write to local orders.json database: {e}")
            
            # Respond with JSON success
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "status": "success",
                "message": "Order placed successfully."
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_error(404, "Endpoint not found")

    def do_OPTIONS(self):
        # Support CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    # Make sure we change the working directory to serve files properly
    os.chdir(DIRECTORY)
    
    # Allow address reuse to avoid 'Address already in use' errors on quick restarts
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), MXHerbalRequestHandler) as httpd:
        print(f"\n==================================================")
        print(f" MX HERBAL BEAUTY SERVER IS NOW ONLINE")
        print(f" Serving local frontend files at http://localhost:{PORT}")
        print(f" Handling API submissions at http://localhost:{PORT}/api/enquiry")
        print(f" Press Ctrl+C to terminate the server")
        print(f"==================================================\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutting down gracefully.")
