class RenameUnknownColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :unknown, :boolean
    add_column :posts, :anonymous, :boolean, default: false
  end
end
