defmodule ParaAhiWeb.PageController do
  use ParaAhiWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
