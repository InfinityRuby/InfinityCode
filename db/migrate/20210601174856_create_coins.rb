class CreateCoins < ActiveRecord::Migration[6.1]
  def change
    create_table :coins do |t|
      t.references :user
      t.integer :coin_change, default: 0
      t.string :description

      t.timestamps
    end
  end
end
