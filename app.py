import sys
import os
sys.path.append('backend')

# Import and run the backend app
from backend.app import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
