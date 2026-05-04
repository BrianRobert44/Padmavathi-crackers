import os
import re

file_path = r"d:\sivakasi-crackers\src\components\productData.js"
products_dir = r"d:\sivakasi-crackers\public\products"

# 1. Map exact casing of files on disk
actual_files = {} # lowercase -> exact name
if os.path.exists(products_dir):
    for f in os.listdir(products_dir):
        actual_files[f.lower()] = f

# 2. Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 3. Repair fragmentation
# Remove newlines inside quotes for name, category, and image fields
def cleanup_field(match):
    field = match.group(1)
    value = match.group(2).replace('\r', '').replace('\n', ' ').strip()
    # For images, don't add space, just join
    if "image" in field:
        value = value.replace(' ', '')
    return f'{field}: "{value}"'

# Match name: "...", category: "...", image: "..." potentially across lines
content = re.sub(r'(name|category|image|count):\s*"([^"]+)"', cleanup_field, content, flags=re.DOTALL)

# 4. Fix casing for images
def fix_casing(match):
    prefix = match.group(1)
    path = match.group(2)
    filename = path.replace("/products/", "")
    
    if filename.lower() in actual_files:
        correct_name = actual_files[filename.lower()]
        return f'{prefix}"/products/{correct_name}"'
    return match.group(0)

content = re.sub(r'(image:\s*)("([^"]+)")', fix_casing, content)

# 5. Normalize overall formatting (remove excessive blanks, fix indentation)
content = re.sub(r'\n\s*\n', '\n', content) # remove double blanks

with open(file_path, 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(content)

print("Repair completed successfully!")
