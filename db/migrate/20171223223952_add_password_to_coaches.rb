class AddPasswordToCoaches < ActiveRecord::Migration[5.1]
  def change
    add_column :coaches, :password_digest, :string
  end
end
