defmodule ParaAhiWeb.ChatChannel do
  use ParaAhiWeb, :channel

  @impl true
  def join("chat:" <> game_id, payload, socket) do
    if !authorized?(payload) do
      {:error, %{reason: "unauthorized"}}
    end

    if game_id == "" do
      {:error, %{reason: "game_id not present"}}
    else
      {:ok, socket}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (chat:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
