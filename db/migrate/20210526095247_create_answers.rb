class CreateAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.references :quest
      t.references :user
      t.text :code
      t.string :status

      t.timestamps
    end
  end
end
