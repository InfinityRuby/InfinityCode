class CreateUserProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :avatar
      t.string :name
      t.text :bio

      t.timestamps
    end
  end
end
