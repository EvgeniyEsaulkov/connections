class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time
      t.string :kind, null: false
      t.string :location, null: false
      t.text :description

      t.timestamps
    end
  end
end
