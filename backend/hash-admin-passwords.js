const bcrypt = require("bcrypt");
const Admin = require("./models/Admin"); // Adjust the path as per your project structure

(async () => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.findAll();

    for (let admin of admins) {
      // Check if the password is already hashed (hashes usually start with "$2b$")
      if (!admin.Password.startsWith("$2b$")) {
        const hashedPassword = await bcrypt.hash(admin.Password, 10); // Hash the plain-text password
        admin.Password = hashedPassword;
        await admin.save(); // Save the updated admin record
        console.log(`Password for AdminID ${admin.AdminID} hashed successfully.`);
      }
    }
    console.log("All plain text passwords have been hashed.");
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error hashing passwords:", error);
    process.exit(1); // Exit with error
  }
})();
