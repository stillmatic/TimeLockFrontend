# Time Locked Receiver Frontend

Look I don't really understand React at all. This mostly works but doesn't correctly get the callback (i.e. finish waiting for a transaction to finish).

Works to create receivers. You have to manually go get the emitted event from [Etherscan](https://rinkeby.etherscan.io/address/0x3696b906b1a575b2b46528bf839706b08718cf43#events) though. I gues this could be handled mechanically through TheGraph.

### 2. Create a .env.local file within the root directory with the following environment variables
```bash
NEXT_PUBLIC_INFURA_ID=<insert infura id>
```
>Note: Grab an Infura ID from the [Infura website](https://infura.io/)

### 3. Start the local development environment
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

That's it, you're all set!

## Deploy on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSeth-McKilla%2Fnextjs-wagmi&env=NEXT_PUBLIC_INFURA_ID)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
