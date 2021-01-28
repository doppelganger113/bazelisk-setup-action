# Bazelisk setup action
This action installs Bazelisk in the GitHub action workflow.

## Example usage
```yaml

steps:
  - name: Setup Bazelisk
    uses: actions/bazelisk-setup-action@v1.0
```

## Development

1. Ensure that your tests and linter pass before updating
   ```bash
   npm run lint && npm test 
   ```
2. Build the app distribution with
    ```bash
    npm run build
    ```
