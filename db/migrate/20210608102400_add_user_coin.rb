class AddUserCoin < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :coin_amount, :integer
  end
end
