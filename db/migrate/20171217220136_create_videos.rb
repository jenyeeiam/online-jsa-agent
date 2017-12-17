class CreateVideos < ActiveRecord::Migration[5.1]
  def change
    create_table :videos do |t|
      t.references :player, index: true, foreign_key: true
      t.string :url

      t.timestamps
    end
  end
end
