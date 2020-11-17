class DeviseCreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string   :first_name,         null: false, default: ''
      t.string   :last_name,          null: false, default: ''
      t.string   :email,              null: false, default: ''
      t.string   :encrypted_password, null: false, default: ''
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      ## Refresh token for JWT auth
      t.string   :refresh_token

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    add_index 'users', ['refresh_token'], name: 'index_users_on_refresh_token', unique: true, using: :btree

  end
end