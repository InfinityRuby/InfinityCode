class AddPostUnknown < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :unknown, :boolean, default: false
  end
end
