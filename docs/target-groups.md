# Target Groups

Target Groups allow you to organize your targets into categories with visual
distinction in the Warpgate UI. This makes it easier for users to find and
navigate to the right targets.

## Creating a Target Group

1. Go to `Config` > `Target Groups`
2. Click "Add target group"
3. Fill in the details:
   - **Name**: A descriptive name for the group
   - **Description**: Optional description
   - **Color**: Choose a color for visual distinction (primary, secondary,
     success, danger, warning, info, light, dark)

## Assigning Targets to Groups

1. Go to `Config` > `Targets`
2. Select the target you want to assign
3. In the target settings, find the "Group" dropdown
4. Select the target group

## How Target Groups Appear

Targets are grouped visually in the Warpgate web interface:

- Grouped targets appear under their group header
- Each group displays its color indicator
- Users see a organized list of targets by group

## Use Cases

### Environment-based Groups

Organize targets by environment:

- **Production** (red/danger)
- **Staging** (yellow/warning)
- **Development** (blue/info)

### Service-based Groups

Organize targets by service type:

- **Databases** (primary)
- **API Servers** (success)
- **Legacy Systems** (secondary)

### Team-based Groups

Organize targets by team ownership:

- **Platform Team** (primary)
- **Backend Team** (success)
- **Data Team** (info)

## Managing Target Groups

To edit or delete a target group:

1. Go to `Config` > `Target Groups`
2. Click on the group you want to modify
3. Make changes or click delete

!!! note Deleting a target group will unassign all targets from that group. The
targets themselves will not be deleted.
