# Bazelisk setup action
![Node.js CI](https://github.com/doppelganger113/bazelisk-setup-action/workflows/Node.js%20CI/badge.svg)

This action installs latest Bazelisk in the GitHub actions workflow.

## Inputs

### `version`

**Optional** The version of Bazelisk to install. Default `"latest"`.


## Example usage
```yaml
steps:
  - name: Setup Bazelisk
    uses: doppelganger113/bazelisk-setup-action@v1.0.1
    with:
      version: 'latest'
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
