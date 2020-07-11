defmodule ParaAhi.Repo do
  use Ecto.Repo,
    otp_app: :para_ahi,
    adapter: Ecto.Adapters.Postgres
end
