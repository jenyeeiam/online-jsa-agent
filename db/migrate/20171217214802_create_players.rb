class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.string :name
      t.string :position
      t.string :bats
      t.string :throws
      t.string :email
      t.string :alma_mater
      t.text :accolades
      t.float :batting_avg
      t.float :era

      t.timestamps
    end
  end
end
