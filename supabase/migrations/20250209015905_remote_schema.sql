set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.can_access_fitness_user(user_id uuid, target_id uuid, target_role integer)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    RETURN (
        -- オーナー: 全データにアクセス可能
        (SELECT role_id FROM public.fitness_reservation_users WHERE id = user_id) = 1
        
        -- トレーナー: 自分のデータと全顧客データにアクセス可能
        OR (user_id = target_id AND target_role = 2)
        OR (target_role = 3 AND (SELECT role_id FROM public.fitness_reservation_users WHERE id = user_id) = 2)
        
        -- 顧客: 自分のデータにのみアクセス可能
        OR (user_id = target_id AND target_role = 3)
    );
END;
$function$
;


