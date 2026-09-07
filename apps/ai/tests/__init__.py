import sys
import os

ai_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ai_root not in sys.path:
    sys.path.insert(0, ai_root)
