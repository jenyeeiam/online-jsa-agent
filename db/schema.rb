# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180128004047) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coaches", force: :cascade do |t|
    t.string "team"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "player_id"
    t.bigint "coach_id"
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "sender"
    t.string "japanese_text"
    t.index ["coach_id"], name: "index_messages_on_coach_id"
    t.index ["player_id"], name: "index_messages_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.string "position"
    t.string "bats"
    t.string "throws"
    t.string "email"
    t.string "alma_mater"
    t.text "accolades"
    t.float "batting_avg"
    t.float "era"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.text "japanese_accolades"
    t.boolean "deleted"
  end

  create_table "videos", force: :cascade do |t|
    t.bigint "player_id"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_videos_on_player_id"
  end

  add_foreign_key "messages", "coaches"
  add_foreign_key "messages", "players"
  add_foreign_key "videos", "players"
end
