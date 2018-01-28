class AddDeletedToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :deleted, :boolean
  end
end
