# Skill Icons Organization

## Current Structure
- `profile.jpeg` - Your profile picture
- `home-image.png` - Home section background

## For Skill Icons (Optional Local Storage)

If you want to store skill icons locally instead of using CDN links, create a `skills/` subfolder:

```
images/
├── profile.jpeg
├── home-image.png
└── skills/
    ├── aws.svg
    ├── kubernetes.svg
    ├── docker.svg
    ├── terraform.svg
    └── ...
```

## How to Use Local Icons

1. **Download icons** from:
   - [Devicon](https://devicon.dev/) - Official tech icons
   - [Simple Icons](https://simpleicons.org/) - Simple SVG icons
   - [Official websites](https://github.com/simple-icons/simple-icons) - Direct from companies

2. **Save them** in `images/skills/` folder

3. **Update HTML** to use local paths:
   ```html
   <!-- Instead of CDN -->
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes">
   
   <!-- Use local path -->
   <img src="images/skills/kubernetes.svg" alt="Kubernetes">
   ```

## Recommended Approach
**Keep using CDN links** as they are:
- More reliable
- Always updated
- Faster loading
- No maintenance required 