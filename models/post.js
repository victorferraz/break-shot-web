'use strict';

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.User, {
          onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
        });
      }
    }
  });
  return Post;
};
