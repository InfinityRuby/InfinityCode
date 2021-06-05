class CreatePrompts < ActiveRecord::Migration[6.1]
  def change
    create_table :prompts do |t|
      t.references :quest
      t.integer :aseq
      t.text :hint

      t.timestamps
    end
  end
end
