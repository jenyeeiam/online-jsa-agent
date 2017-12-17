class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.references :player, index: true, foreign_key: true
      t.references :coach, index: true, foreign_key: true
      t.text :text

      t.timestamps
    end
  end
end
