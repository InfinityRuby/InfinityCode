class CreatePrompts < ActiveRecord::Migration[6.1]
  def change
    create_table :prompts do |t|
      t.integer :quest_id
      t.integer :aseq
      t.text :hint

      t.timestamps
    end
  end
end
