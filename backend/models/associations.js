// Models
const User = require('./User');
const Admin = require('./Admin');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Payment = require('./Payment');
const Shipping = require('./Shipping');
const Return = require('./Return');
const UserOrder = require('./UserOrder');

// Associations

// User-Cart (1:1 relationship)
User.hasOne(Cart, { foreignKey: 'User_ID' });
Cart.belongsTo(User, { foreignKey: 'User_ID' }); // Cart has User_ID as a foreign key

// Cart-CartItem (1:N relationship)
Cart.hasMany(CartItem, { foreignKey: 'Cart_ID' });
CartItem.belongsTo(Cart, { foreignKey: 'Cart_ID' });

// CartItem-Product (N:1 relationship)
CartItem.belongsTo(Product, { foreignKey: 'Product_ID' });
Product.hasMany(CartItem, { foreignKey: 'Product_ID' });

// Category-Product (1:N relationship)
Category.hasMany(Product, { foreignKey: 'Category_ID' });
Product.belongsTo(Category, { foreignKey: 'Category_ID' });


// UserOrder-Order (1:1 relationship)
UserOrder.belongsTo(Order, { foreignKey: 'Order_ID' });
Order.hasOne(UserOrder, { foreignKey: 'Order_ID' });

// Order-OrderItem (1:N relationship)
Order.hasMany(OrderItem, { foreignKey: 'Order_ID' });
OrderItem.belongsTo(Order, { foreignKey: 'Order_ID' });

// OrderItem-Product (N:1 relationship)
OrderItem.belongsTo(Product, { foreignKey: 'Product_ID' });
Product.hasMany(OrderItem, { foreignKey: 'Product_ID' });

// Order-Payment (1:1 relationship)
Order.belongsTo(Payment, { foreignKey: 'Payment_ID' });
Payment.hasOne(Order, { foreignKey: 'Payment_ID' });

// Order-Shipping (1:1 relationship)
Order.belongsTo(Shipping, { foreignKey: 'Shipping_ID' });
Shipping.hasOne(Order, { foreignKey: 'Shipping_ID' });

// Order-Return (1:1 relationship)
Order.hasOne(Return, { foreignKey: 'Order_ID' });
Return.belongsTo(Order, { foreignKey: 'Order_ID' });

// Admin-Return (1:N relationship)
Admin.hasMany(Return, { foreignKey: 'Admin_ID' });
Return.belongsTo(Admin, { foreignKey: 'Admin_ID' });
