class CreatePrompts < ActiveRecord::Migration[6.1]
  def change
    create_table :prompts do |t|
      t.integer :questId
      t.integer :aseq
      t.text :hint

      t.timestamps
    end
  end
end
