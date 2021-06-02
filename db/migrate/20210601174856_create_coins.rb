class CreateCoins < ActiveRecord::Migration[6.1]
  def change
    create_table :coins do |t|
      t.references :user
      t.integer :coin_amount, default: 20
      t.integer :coin_change, default: 0
      t.string :description, default: '無'

      t.timestamps
    end
  end
end
