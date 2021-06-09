class AddPostPublishName < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :publish_author, :boolean, default: false
  end
end
