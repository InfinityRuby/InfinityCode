class AddCommentEmailUrl < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :email, :string
    add_column :comments, :picture, :string
  end
end
