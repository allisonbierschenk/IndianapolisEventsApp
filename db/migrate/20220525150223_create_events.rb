class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title
      t.string :url
      t.string :date
      t.string :address
      t.string :venue

      t.timestamps
    end
  end
end
