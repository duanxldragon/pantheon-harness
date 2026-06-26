# Backend Rules

- Use vertical slices. Do not rebuild horizontal `service/repository/model` mega-directories.
- Database tables must use `system_` or `biz_` prefixes.
- Define DTOs for API responses. Do not return raw GORM models to clients.
- Use `pkg/common.Success` and `pkg/common.Fail` for responses.
- Keep transaction propagation explicit in service methods.
- Model button/resource permissions separately. Do not let `list` stand in for write actions.
- Check schema and indexes before changing logic.

## Derived Repository Focus

- Base-facing changes go to `pantheon-base`.
- Business repositories add only business-domain code and business-domain docs unless the work is explicitly a base upgrade.
