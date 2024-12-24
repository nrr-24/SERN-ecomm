module.exports=(sequelize,DataTypes)=>{
    const Products = sequelize.define('Products', {
        ProductId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          name: {
            allowNull: false,
            type: DataTypes.STRING
          },
          stock: {
            allowNull: false,
            type: DataTypes.INTEGER
          },
          price: {
            allowNull: false,
            type: DataTypes.FLOAT
          },
          image: {
            allowNull: false,
          },

});

return Products;
}