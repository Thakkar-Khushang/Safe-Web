var MyContract = artifacts.require("ImageStorage");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};