```
# Switch back to the main branch
git checkout main

# Switch Git credentials back to Dev 1 (Chetan-Kiran)
git config user.name "Chetan_Kiran"
git config user.email "chetankiran9666@gmail.com"
git remote set-url origin git@github.com-dev1:Chetan-Kiran/Huge-Cart.git

# Pull the merged changes (product-service) down from GitHub
git pull origin main

```

```
# Create and switch to a new branch
git checkout -b feature/inventory-service

# Switch local credentials and SSH host back to Dev 2
git config user.name "Harshini-1912"
git config user.email "neeladhriharshini@gmail.com"
git remote set-url origin git@github.com-dev2:Chetan-Kiran/Huge-Cart.git

```