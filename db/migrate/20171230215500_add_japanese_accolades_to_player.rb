class AddJapaneseAccoladesToPlayer < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :japanese_accolades, :text
  end
end
