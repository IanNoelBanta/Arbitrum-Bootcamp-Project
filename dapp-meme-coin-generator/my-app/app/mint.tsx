function StartMinting(address: string, changeAdd: Function, value: number, handleChange: Function) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <input
        type="text"
        className="border rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent"
        value={address}
        onChange={(e) => changeAdd(e)}
        placeholder="Enter wallet address"
        style={{ color: "black" }}
      />

      <input
        type="number"
        className="border rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder="Enter amount to mint"
        style={{ color: "black" }}
      />
    </div>
  );
}

export default StartMinting;
