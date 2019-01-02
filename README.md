# spacefish-bot

> 🤖 A helpful bot to automate common tasks on [spacefish](https://github.com/matchai/spacefish) Issues/PRs

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Deploying

```sh
# Add environment variables to Now
now secrets add spacefish-app-id <your-app-id>
now secrets add spacefish-webhook-secret <random-webhook-secret>

# Download your private key to the root of this project and use base64 encoding to add it to Now
now secrets add spacefish-key '$(cat ./private-key.pem | base 64)'

# Deploy to now
now
```

## Contributing

If you have suggestions for how spacefish-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 Matan Kushner
