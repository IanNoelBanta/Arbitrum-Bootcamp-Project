function walletConnection (isConnected: boolean) {
    var connectionStatus = "Connect your Wallet";

    if (isConnected) {
        connectionStatus = "Wallet Connected!";
    }
    
    return (
        <main className="mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">
            <h1 className="text-4xl font-bold">{connectionStatus}</h1>
        </main>
    );    
}

export default walletConnection;