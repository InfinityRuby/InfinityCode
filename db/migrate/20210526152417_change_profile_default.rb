class ChangeProfileDefault < ActiveRecord::Migration[6.1]
  def change
    change_column :profiles, :name, :string
    change_column :profiles, :bio, :text
  end
end
