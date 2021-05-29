class ChangeProfileDefaultNil < ActiveRecord::Migration[6.1]
  def up
    change_column_default(:profiles, :name, nil)
    change_column_default(:profiles, :bio, nil)
    change_column_default(:profiles, :avatar, nil)
  end

  def down
    change_column :profiles, :name, :string
    change_column :profiles, :bio, :text
  end
end
