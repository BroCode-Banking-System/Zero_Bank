const accounts = [];

exports.createAccount = (req, res) => {
  accounts.push(req.body);
  res.json({ message: "Account created", accounts });
};

exports.getAccounts = (_, res) => res.json(accounts);

exports.updateAccount = (req, res) => {
  const acc = accounts.find(a => a.id === req.body.id);
  if (!acc) return res.status(404).json({ message: "Not found" });
  Object.assign(acc, req.body);
  res.json({ message: "Account updated", acc });
};
exports.deleteAccount = (req, res) => {
  const i = accounts.findIndex(a => a.id === req.params.id);
  if (i < 0) return res.status(404).json({ message: "Not found" });
  accounts.splice(i, 1);
  res.json({ message: "Account deleted", accounts });
};