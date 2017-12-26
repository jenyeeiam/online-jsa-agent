class AddTranslatedToMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :japanese_text, :string
  end
end
