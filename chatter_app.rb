require 'sinatra'
require 'sinatra/assetpack'
require "sinatra/json"

require_relative 'config.rb'

class ChatterApp < Sinatra::Base
  helpers Sinatra::JSON
  attr_reader :online_users

  def initialize
    @online_users = []
    super
  end
  
  register Sinatra::AssetPack

  assets do
    serve '/js', from: 'assets/javascripts'
    serve '/css', from: 'assets/stylesheets'
  end

  post '/new_message' do
    Pusher['chat'].trigger('new_message', {
      message: "#{ params[:username] }: #{ params[:chat] }"
    })
  end

  post '/add_user' do
    @online_users = [] unless Pusher.get('/channels/chat')[:occupied]
    online_users << params[:user] unless online_users.include?(params[:user])

    Pusher['chat'].trigger('users_change', {
      message: json(online_users)
    })
    json({ status: 200, response:  { message: 'Added User' }})
  end

  post '/remove_user' do
    online_users.delete params[:user]

    Pusher['chat'].trigger('users_change', {
      message: json(online_users)
    })
    json({ status: 200, response:  { message: 'Removed User' }})
  end

  get '/online_users' do
    json online_users
  end

  get '/channel_info' do
    Pusher.get('/channels/chat')[:occupied]
  end

  get '/' do
    send_file 'chat.html'
  end
end