class CreateQuests < ActiveRecord::Migration[6.1]
  def change
    create_table :quests do |t|
      t.string :title
      t.string :level
      t.text :description
      t.string :picture
      t.text :problem

      t.timestamps
    end
  end
end
