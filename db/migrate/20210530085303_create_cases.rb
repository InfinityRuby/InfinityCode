class CreateCases < ActiveRecord::Migration[6.1]
  def change
    create_table :cases do |t|
      t.references :quest
      t.string :input
      t.string :output

      t.timestamps
    end
  end
end
